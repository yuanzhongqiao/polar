'use client'

import { useGitHubAccount, useLogout } from '@/hooks'
import { MaintainerOrganizationContext } from '@/providers/maintainerOrganization'
import { useOutsideClick } from '@/utils/useOutsideClick'
import {
  AddOutlined,
  KeyboardArrowDownOutlined,
  LogoutOutlined,
} from '@mui/icons-material'
import Link from 'next/link'
import { useContext, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { useAuth } from '../../hooks'
import { LinkItem, ListItem, Profile, TextItem } from './Navigation'

const DashboardProfileDropdown = ({ className = '' }) => {
  const classNames = twMerge(
    'relative flex w-full flex-col rounded-full bg-gray-75 hover:bg-gray-100 dark:hover:bg-polar-600 dark:bg-polar-700 transition-colors z-50',
    className,
  )
  const { currentUser: loggedUser } = useAuth()
  const logout = useLogout()

  const githubAccount = useGitHubAccount()

  const [isOpen, setOpen] = useState<boolean>(false)

  const orgContext = useContext(MaintainerOrganizationContext)
  const currentOrg = orgContext?.organization
  const orgs = orgContext?.memberOrganizations ?? []
  const personalOrg = orgContext?.personalOrganization

  const organizationsExceptSelf = orgs.filter(
    (org) => org.name !== loggedUser?.username,
  )

  const ref = useRef(null)

  useOutsideClick([ref], () => {
    setOpen(false)
  })

  const onLogout = async () => {
    await logout()
  }

  if (!loggedUser) {
    return <></>
  }

  const current = currentOrg
    ? ({
        name: currentOrg.name,
        avatar_url: currentOrg.avatar_url,
      } as const)
    : ({
        name: loggedUser.username,
        avatar_url: loggedUser.avatar_url,
      } as const)

  const showAddOrganization = !!githubAccount

  return (
    <>
      <div className={classNames}>
        <div
          className={twMerge(
            'relative flex cursor-pointer flex-row items-center justify-between gap-x-2 py-3 pl-3 pr-4 transition-colors',
          )}
          onClick={() => setOpen(true)}
        >
          <Profile name={current.name} avatar_url={current.avatar_url} />
          <KeyboardArrowDownOutlined className="dark:text-polar-50 h-5 w-5 flex-shrink-0 text-gray-400" />
        </div>

        {isOpen && (
          <div
            ref={ref}
            className={twMerge(
              'dark:bg-polar-700 dark:text-polar-400 absolute -left-2 -right-2 overflow-hidden rounded-3xl bg-white p-1 shadow-xl',
            )}
          >
            <>
              {personalOrg ? (
                <Link
                  href={`/maintainer/${personalOrg.name}/overview`}
                  className="w-full"
                >
                  <ListItem
                    current={
                      currentOrg === undefined ||
                      currentOrg.name === loggedUser.username
                    }
                  >
                    <Profile
                      name={loggedUser.username}
                      avatar_url={loggedUser.avatar_url}
                    />
                  </ListItem>
                </Link>
              ) : null}
            </>

            <ul className="mt-2 flex w-full flex-col">
              <TextItem
                onClick={onLogout}
                icon={<LogoutOutlined fontSize="small" />}
              >
                <span className="mx-3">Log out</span>
              </TextItem>
            </ul>

            {organizationsExceptSelf.length > 0 || showAddOrganization ? (
              <div className="mt-2 flex w-full flex-row items-center gap-x-2 py-4">
                <div className="dark:text-polar-400 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-gray-500">
                  Organizations
                </div>
              </div>
            ) : null}

            {organizationsExceptSelf.length > 0 ? (
              <div className="mb-2 flex flex-col">
                {organizationsExceptSelf.map((org) => (
                  <Link
                    href={`/maintainer/${org.name}/overview`}
                    className="w-full"
                    key={org.id}
                  >
                    <ListItem current={currentOrg?.id === org.id}>
                      <Profile name={org.name} avatar_url={org.avatar_url} />
                    </ListItem>
                  </Link>
                ))}
              </div>
            ) : null}

            {showAddOrganization ? (
              <LinkItem
                href="/maintainer/new"
                icon={
                  <AddOutlined
                    fontSize="small"
                    className="h-5 w-5 text-blue-500 dark:text-blue-400"
                  />
                }
              >
                <span className="mx-2 text-blue-500 dark:text-blue-400">
                  Add organization
                </span>
              </LinkItem>
            ) : null}
          </div>
        )}
      </div>
    </>
  )
}

export default DashboardProfileDropdown
