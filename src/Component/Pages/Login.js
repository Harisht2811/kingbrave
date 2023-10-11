import React, { useState, useRef, useEffect } from 'react'
import { toast } from 'react-hot-toast';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import ClipLoader from "react-spinners/ClipLoader";
import { useUserAuth } from '../../Firebase/UserAuth';


export const Login = () => {

  const { setRecaptcha } = useUserAuth();
  const [phonenumber, setPhoneNumber] = useState();
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [activeIndex, setActiveIndex] = useState(0);
  const [isResend, setIsResend] = useState(true);
  const [isSend, setIsSend] = useState(true);
  const [isLoad, setIsLoad] = useState(true);
  const [timer, setTimer] = useState(30);
  const [confirmObj, setConfirmObj] = useState("");
  const inputRef = useRef();
  let valueOTP;
  let currentOTPIndex = 0

  useEffect(() => {
    inputRef.current?.focus()
    if (timer == 0) setIsResend(true)
    let countsSeconds = setInterval(() => {
      setTimer(timer - 1)
    }, 1000)
    return () => clearInterval(countsSeconds)
  }, [timer, activeIndex])

  const getOtp = async () => {
    if (phonenumber == '' || phonenumber == undefined) {
      toast.error('Please enter a number')
    }
    else {
      setIsLoad(false)
      try {
        const response = await setRecaptcha(phonenumber);
        console.log('response', response);
        setConfirmObj(response)
        toast.success('OTP send successfully');
        setIsSend(false);
        setIsResend(false)
        setTimer(30)
      }
      catch (err) {
        console.log(err.message)
      }
    }

  }

  const handleKeyDown = (key, index) => {
    // console.log(key)
    currentOTPIndex = index
    if (key.key == 'ArrowLeft') setActiveIndex(currentOTPIndex - 1)
    // if (key.key == 'Backspace' ) setActiveIndex(currentOTPIndex - 1)
    if (key.key == 'ArrowRight') setActiveIndex(currentOTPIndex + 1)

  }

  const handleChange = (e, index) => {
    const { value } = e.target
    const newOTP = [...otp]
    newOTP[index] = value.substring(value.length - 1);
    if (!value) {
      setActiveIndex(index - 1)
    }
    else {
      setActiveIndex(index + 1)
    }
    setOtp(newOTP)
  }

  const verifyOtp = async () => {
    valueOTP = otp
    if (valueOTP == '' || valueOTP == null)
      toast.error('Enter the OTP');
    try {

      await confirmObj.confirm(parseInt(valueOTP.join('')))
      toast.success('user logged in')
    }
    catch (err) {
      console.log(err)
    }

  }

  const resendOTP = async() => {
    // getOtp();
    setIsResend(false)
    setTimer(30)
    // try{
    //   const response = await setRecaptcha(phonenumber);
    //   console.log('response', response);
    //   setConfirmObj(response)
    // }
    // catch(err){
    //     console.log(err);
    // }
        
  }



  return (

    <div>

      <div className='flex w-[100%] '>
        <div className="bg-[url('/public/Images/bgvolleyball.jpeg')] h-[100vh] w-[50%] bg-cover">
        </div>
        <div className='w-[50%] mt-[5%] px-10 py-10'>
          <p className='text-center font-Poppins font-[700] text-[28px]'>Welcome Boyz !</p>
          {
            isSend ?
              <div className='ml-[35%] mt-[20%] block'>
                <div>
                  <p className='text-[24px] font-Poppins font-[500]'>Enter the phonenumber</p>

                  <PhoneInput
                    className='mt-[5%]'
                    country={'in'}
                    value={phonenumber}
                    onChange={setPhoneNumber}
                  />
                  <div id='recaptcha-container'></div>
                </div>
                <button
                  className='h-[40px] w-[100px] text-[16px] bg-[#036AD1] text-white px-2 py-2 mt-[5%] ml-[18%]'
                  onClick={getOtp}
                >{isLoad ? 'Send code' : <ClipLoader size={20} color='white' />}</button>
              </div> :
              <div className='ml-[35%] mt-[20%] block'>
                <div>
                  <p className='text-[24px] font-Poppins font-[500] -ml-[2%]'>Verify the phonenumber</p>
                  <div className='flex mt-[5%]'>
                    {
                      otp.map((_, index) => {
                        return (
                          <>
                            <input
                              key={index}
                              ref={index === activeIndex ? inputRef : null}
                              className='ml-[1%] w-[40px] px-[2%] outline-none border text-gray-500  text-[25px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                              placeholder='0'
                              type='number'
                              inputMode='numeric'
                              maxLength={1}
                              value={otp[index]}
                              onChange={(e) => handleChange(e, index)}
                              onKeyDown={(e) => handleKeyDown(e, index)}
                            >
                            </input>
                          </>
                        )
                      })
                    }
                  </div>
                </div>
                <div className='flex w-[50%]'>
                  <div
                    className='mt-[10%] text-blue-500 ml-[2%] cursor-pointer w-[45%]'
                    onClick={resendOTP}
                  >
                    {isResend ? 'Resend the code' :
                      <span className='text-[18px] text-blue-500 ml-[15%] mt-[2%]'>00:{timer < 10 ? '0' + timer : timer}</span>
                    }</div>
                  <button
                    className='h-[40px] w-[100px] text-[16px] bg-[#036AD1] text-white px-2 py-2 mt-[5%] ml-[18%]'
                    onClick={verifyOtp}
                  >
                    Submit
                  </button>
                </div>

              </div>
          }


        </div>
      </div>



    </div>
  )
}
