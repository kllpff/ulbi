import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm'
import { Profile, validateProfileError } from '../../types/profile'
import { validateProfileData } from '../validateProfileData/validateProfileData'

export const updateProfileData = createAsyncThunk<
  Profile,
  void,
  ThunkConfig<validateProfileError[]>
>('profile/updateProfileData', async (_, thunkApi) => {
  const { extra, rejectWithValue, getState } = thunkApi

  const formData = getProfileForm(getState())

  const errors = validateProfileData(formData)

  if (errors.length) return rejectWithValue(errors)

  try {
    const response = await extra.api.put<Profile>('/profile', formData)
    return response.data
  } catch (e) {
    return rejectWithValue([validateProfileError.SERVER_ERROR])
  }
})
