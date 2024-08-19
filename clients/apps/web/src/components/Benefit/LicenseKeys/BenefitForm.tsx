'use client'

import { BenefitCustomCreate, Organization } from '@polar-sh/sdk'
import { Switch } from 'polarkit/components/ui/atoms'
import Input from 'polarkit/components/ui/atoms/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'polarkit/components/ui/atoms/select'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'polarkit/components/ui/form'
import { useFormContext } from 'react-hook-form'

const LicenseKeysForm = ({ organization }: { organization: Organization }) => {
  const { control, watch, getValues, setValue } =
    useFormContext<BenefitCustomCreate>()

  const expires = watch('properties.expires', undefined)
  const activations = watch('properties.activations', undefined)

  return (
    <>
      <FormField
        control={control}
        name="properties.prefix"
        render={({ field }) => {
          return (
            <FormItem>
              <div className="flex flex-row items-center justify-between">
                <FormLabel>Key prefix</FormLabel>
              </div>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )
        }}
      />

      <div className="flex flex-row items-center">
        <div className="grow">
          <label htmlFor="license-key-ttl">Expires</label>
        </div>
        <FormField
          control={control}
          name="properties.expires"
          render={({ field }) => {
            return (
              <FormItem>
                <Switch
                  id="license-key-ttl"
                  checked={field.value}
                  onCheckedChange={(expires) => {
                    const value = expires ? {} : undefined
                    setValue('properties.expires', value)
                  }}
                />
                <FormMessage />
              </FormItem>
            )
          }}
        />
      </div>
      {expires && (
        <>
          <FormField
            control={control}
            name="properties.expires.ttl"
            render={({ field }) => {
              return (
                <FormItem>
                  <div className="flex flex-row items-center justify-between">
                    <FormLabel>TTL</FormLabel>
                  </div>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
          <FormField
            control={control}
            name="properties.expires.timeframe"
            shouldUnregister={true}
            render={({ field }) => {
              return (
                <FormItem>
                  <div className="flex flex-row items-center justify-between">
                    <FormLabel>Type</FormLabel>
                  </div>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select timeframe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="day">Days</SelectItem>
                        <SelectItem value="month">Months</SelectItem>
                        <SelectItem value="year">Years</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
        </>
      )}

      <div className="flex flex-row items-center">
        <div className="grow">
          <label htmlFor="license-key-limit">Activation Limits</label>
        </div>
        <FormField
          control={control}
          name="properties.activations"
          render={({ field }) => {
            return (
              <FormItem>
                <Switch
                  id="license-key-limit"
                  checked={field.value}
                  onCheckedChange={(limited) => {
                    const value = limited ? {} : undefined
                    setValue('properties.activations', value)
                  }}
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )
          }}
        />
      </div>
      {activations && (
        <>
          <FormField
            control={control}
            name="properties.activations.limit"
            render={({ field }) => {
              return (
                <FormItem>
                  <div className="flex flex-row items-center justify-between">
                    <FormLabel>Activation Limit</FormLabel>
                  </div>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
        </>
      )}
    </>
  )
}

interface LicenseKeysBenefitFormProps {
  organization: Organization
  update?: boolean
}

const LicenseKeysEditForm = ({ organization }: LicenseKeysBenefitFormProps) => {
  return <LicenseKeysForm organization={organization} />
}

export const LicenseKeysBenefitForm = ({
  organization,
  update = false,
}: LicenseKeysBenefitFormProps) => {
  if (!update) {
    return <LicenseKeysForm organization={organization} />
  }

  return <LicenseKeysEditForm organization={organization} />
}