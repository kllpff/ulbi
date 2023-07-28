import {
  ProfileCard,
  fetchProfileData,
  getProfileData,
  getProfileError,
  getProfileIsLoading,
  profileReducer,
  profileActions,
} from 'entities/Profile'
import { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { classNames } from 'shared/lib/classNames/classNames'
import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader'
import { getProfileReadonly } from '../../../entities/Profile/model/selectors/getProfileReadonly/getProfileReadonly'

const reducers: ReducersList = {
  profile: profileReducer,
}

interface ProfilePageProps {
  className?: string
}

const ProfilePage = ({ className }: ProfilePageProps) => {
  const dispatch = useDispatch()

  const data = useSelector(getProfileData)
  const error = useSelector(getProfileError)
  const isLoading = useSelector(getProfileIsLoading)
  const readonly = useSelector(getProfileReadonly)

  useEffect(() => {
    dispatch(fetchProfileData())
  }, [dispatch])

  const onChangeFirstname = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({ firstname: value || '' }))
  }, [dispatch])

  const onChangeLastname = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({ lastname: value || '' }))
  }, [dispatch])

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={classNames('', {}, [className])}>
        <ProfilePageHeader />
        <ProfileCard
          data={data}
          isLoading={isLoading}
          error={error}
          onChangeFirstname={onChangeFirstname}
          onChangeLastname={onChangeLastname}
          readonly={readonly}
        />
      </div>
    </DynamicModuleLoader>
  )
}

export default ProfilePage
