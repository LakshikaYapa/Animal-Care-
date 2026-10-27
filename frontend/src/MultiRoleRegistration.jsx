import { useState } from 'react'
import VolunteerRegistration from './VolunteerRegistration.jsx'
import AdopterRegistration from './AdopterRegistration.jsx'
import FunderRegistration from './FunderRegistration.jsx'
import StaffRegistration from './StaffRegistration.jsx'

const screens = {
  volunteer: VolunteerRegistration,
  adopter: AdopterRegistration,
  funder: FunderRegistration,
  staff: StaffRegistration,
}

export default function MultiRoleRegistration({ roles }) {
  const [activeRole, setActiveRole] = useState(roles[0].value)
  const selection = roles.map((role) => role.value).join(',')

  return (
    <div>
      <nav className="mx-[4%] mt-4 rounded-2xl border border-[#dce4d8] bg-white p-4" aria-label="Selected registration roles">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-bold">Your selected roles ({roles.length})</p>
          <a className="text-sm underline underline-offset-4" href={`#register?roles=${selection}`}>Change roles</a>
        </div>
        <p className="mt-2 text-sm text-[#52655c]">Switch between roles to enter your details. Your entries stay here while you switch.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {roles.map((role) => (
            <button className={`rounded-full border border-[#b7c5b4] px-4 py-2 text-sm ${activeRole === role.value ? 'bg-[#d7edaa] font-bold text-[#18372e]' : ''}`} type="button" aria-pressed={activeRole === role.value} aria-controls={`role-panel-${role.value}`} onClick={() => setActiveRole(role.value)} key={role.value}>{role.label}</button>
          ))}
        </div>
      </nav>
      {roles.map((role) => {
        const Screen = screens[role.value]
        return <div id={`role-panel-${role.value}`} hidden={activeRole !== role.value} key={role.value}><Screen /></div>
      })}
    </div>
  )
}
