import React, { FC, useState } from 'react'
import { RequestCreditsViewNS } from './request-credits-view.types'
import { Alert } from '@/components/molecules/alert'
import { Dialog } from '@/components/organisms/dialog'
import { Typography } from '@/components/atoms/typography'
import { Button } from '@/components/atoms/button'
import { Input } from '@/components/atoms/input'

const Credits = ['1', '5', '10', '20', '>50']

const RequestCreditsView: FC<RequestCreditsViewNS.RequestCreditsViewProps> = ({
  onRequestCredits,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCredit, setSelectedCredit] = useState(Credits[0])
  const [phoneNumber, setPhoneNumber] = useState('')
  const [phoneError, setPhoneError] = useState('')

  const validatePhone = (phone: string) => {
    if (!phone) {
      return 'Phone number is required'
    }

    // Strip the +91 prefix if present for validation
    const numberOnly = phone.startsWith('+91') ? phone.substring(3) : phone

    // Validate the 10-digit part
    if (!/^[6-9]\d{9}$/.test(numberOnly)) {
      return 'Please enter valid number'
    }

    return ''
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPhoneNumber(value)
    setPhoneError('')
  }

  const handleSubmit = () => {
    const error = validatePhone(phoneNumber)
    if (error) {
      setPhoneError(error)
      return
    }
    const credit = selectedCredit === '>50' ? '50+' : selectedCredit
    onRequestCredits(credit, phoneNumber)
    reset()
  }

  function reset() {
    setIsOpen(false)
    // To avoid the flickering of the input field when the dialog closes
    setTimeout(() => {
      setPhoneNumber('')
      setPhoneError('')
      setSelectedCredit(Credits[0])
    }, 100)
  }

  return (
    <div>
      <Alert
        className="select-none"
        buttonLabel="Request for Credits"
        onButtonClick={() => setIsOpen(true)}
        shortContent
        showButton
        title="Insufficient Credits available!"
        variant="warning"
      />
      <Dialog
        open={isOpen}
        onOpenChange={reset}
        trigger={null}
        contentClassName="w-min"
        body={
          <div className="px-4 py-2 w-72 md:w-[480px]">
            <div className="flex flex-col gap-2">
              <Typography variant={'h3'} className="text-light-2">
                How many credits do you need?
              </Typography>
              <Typography variant={'body2'} className="text-light-4">
                <span className="underline">Note:</span> One credit is needed to
                unlock a site report. Please provide your phone number to make a
                request.
              </Typography>
            </div>

            <div className="flex flex-row gap-2 mt-2">
              {Credits.map((credit) => (
                <Button
                  variant={selectedCredit === credit ? 'primary' : 'secondary'}
                  key={credit}
                  className={selectedCredit === credit ? '' : ' bg-light-2'}
                  size={'sm'}
                  onClick={() => {
                    setSelectedCredit(credit)
                  }}
                >
                  {credit}
                </Button>
              ))}
            </div>

            <div className="flex flex-col mt-4">
              <Typography className="text-sm font-medium mb-1 text-light-2">
                Phone Number *
              </Typography>
              <Input
                id="phoneNumber"
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneChange}
                className="h-12"
                placeholder="Enter phone number"
                maxLength={13}
                isError={!!phoneError}
                message={phoneError}
              />
            </div>
          </div>
        }
        footer={
          <div className="flex w-full gap-2 justify-evenly">
            <Button
              variant="secondary"
              onClick={reset}
              title={'Cancel'}
            ></Button>
            <Button
              variant="primary"
              suffixIcon={
                <img
                  src={
                    'https://frontend-static-files.geoiq.io/strapi/navbar_credits_247858e26a.svg'
                  }
                  width={16}
                  height={16}
                  alt="coin icon"
                  className="ml-1"
                ></img>
              }
              title={`Request ${selectedCredit} `}
              onClick={handleSubmit}
            ></Button>
          </div>
        }
      ></Dialog>
    </div>
  )
}

export default RequestCreditsView
