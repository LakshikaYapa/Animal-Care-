import { useEffect, useRef, useState } from 'react'
import VolunteerRegistration from './VolunteerRegistration.jsx'
import AdopterRegistration from './AdopterRegistration.jsx'
import FunderRegistration from './FunderRegistration.jsx'
import StaffRegistration from './StaffRegistration.jsx'
import { registerAccount } from './api/auth.js'
import { createRegistrationPayload, sharedRegistrationDetailsMatch } from './api/registration.js'

const screens = {
  volunteer: VolunteerRegistration,
  adopter: AdopterRegistration,
  funder: FunderRegistration,
  staff: StaffRegistration,
}

export default function MultiRoleRegistration({ roles }) {
  const [activeRole, setActiveRole] = useState(roles[0].value)
  const [roleValues, setRoleValues] = useState({})
  const completedRolesRef = useRef(new Set())
  const [completedRoles, setCompletedRoles] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [feedback, setFeedback] = useState({ type: '', message: '', errors: [] })
  const selection = roles.map((role) => role.value).join(',')
  const feedbackRef = useRef(null)

  useEffect(() => {
    if (feedback.message) feedbackRef.current?.scrollIntoView({ block: 'center' })
  }, [feedback])

  function updateRoleValues(role, values) {
    setRoleValues((previous) => ({ ...previous, [role]: values }))

    if (completedRolesRef.current.has(role)) {
      const nextCompleted = new Set(completedRolesRef.current)
      nextCompleted.delete(role)
      completedRolesRef.current = nextCompleted
      setCompletedRoles([...nextCompleted])
    }

    setFeedback({ type: '', message: '', errors: [] })
  }

  async function submitRole(role, values) {
    const allValues = { ...roleValues, [role]: values }
    setRoleValues(allValues)

    const nextCompleted = new Set(completedRolesRef.current)
    nextCompleted.add(role)
    completedRolesRef.current = nextCompleted
    setCompletedRoles([...nextCompleted])

    const unfinishedRoles = roles.filter(({ value }) => !nextCompleted.has(value))
    if (unfinishedRoles.length) {
      setFeedback({
        type: 'status',
        message: `Saved ${roles.find((item) => item.value === role)?.label} details. Complete ${unfinishedRoles.map((item) => item.label).join(' and ')} to create your account.`,
        errors: [],
      })
      return
    }

    if (!sharedRegistrationDetailsMatch(roles, allValues)) {
      setFeedback({
        type: 'error',
        message: 'Use the same full name, email address, and password for each selected role.',
        errors: [],
      })
      return
    }

    setIsSubmitting(true)
    setFeedback({ type: '', message: '', errors: [] })
    try {
      await registerAccount(createRegistrationPayload(roles, allValues))
      setIsComplete(true)
      setFeedback({
        type: 'success',
        message: 'Registration successful. Your account is ready; log in to continue.',
        errors: [],
      })
    } catch (error) {
      setFeedback({
        type: 'error',
        message: error.message,
        errors: (Array.isArray(error.validationErrors) ? error.validationErrors : []).map(({ field, message }) => `${field}: ${message}`),
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  function submitLabel(role) {
    const hasOtherUnfinishedRole = roles.some(({ value }) => value !== role && !completedRoles.includes(value))
    return hasOtherUnfinishedRole ? 'Save role details' : 'Create account'
  }

  return (
    <div>
      <nav className="mx-[4%] mt-4 rounded-2xl border border-[#dce4d8] bg-white p-4" aria-label="Selected registration roles">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-bold">Your selected roles ({roles.length})</p>
          <a className="text-sm underline underline-offset-4" href={`#register?roles=${selection}`}>Change roles</a>
        </div>
        <p className="mt-2 text-sm text-[#52655c]">Switch between roles to enter your details. Your entries stay here while you switch. Use the same name, email, and password for each role.</p>
        {feedback.message && (
          <div ref={feedbackRef} className={`mt-3 rounded-xl border p-3 text-sm ${feedback.type === 'error' ? 'border-red-300 bg-red-50 text-red-800' : feedback.type === 'success' ? 'border-[#90ad7b] bg-[#f0f7e8] text-[#18372e]' : 'border-[#dce4d8] bg-[#f7f7ef] text-[#52655c]'}`} role={feedback.type === 'error' ? 'alert' : 'status'} aria-live="polite">
            <p>{feedback.message}</p>
            {feedback.errors.length > 0 && <ul className="mt-2 list-disc pl-5">{feedback.errors.map((error, index) => <li key={`${error}-${index}`}>{error}</li>)}</ul>}
            {isComplete && <a className="mt-2 inline-block font-bold underline underline-offset-4" href="#login">Log in</a>}
          </div>
        )}
        <div className="mt-3 flex flex-wrap gap-2">
          {roles.map((role) => (
            <button className={`rounded-full border border-[#b7c5b4] px-4 py-2 text-sm ${activeRole === role.value ? 'bg-[#d7edaa] font-bold text-[#18372e]' : ''}`} type="button" aria-pressed={activeRole === role.value} aria-controls={`role-panel-${role.value}`} onClick={() => setActiveRole(role.value)} key={role.value}>{role.label}{completedRoles.includes(role.value) ? ' ✓' : ''}</button>
          ))}
        </div>
      </nav>
      {roles.map((role) => {
        const Screen = screens[role.value]
        return (
          <div id={`role-panel-${role.value}`} hidden={activeRole !== role.value} key={role.value}>
            <Screen
              onValuesChange={updateRoleValues}
              onSubmitRole={submitRole}
              isSubmitting={isSubmitting}
              isComplete={isComplete}
              submitLabel={submitLabel(role.value)}
            />
          </div>
        )
      })}
    </div>
  )
}
