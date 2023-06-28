import { useState, useRef } from 'react'
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function AuthForm() {
    const { data: session } = useSession();
    const firstNameInputRef = useRef();
    const lastNameInputRef = useRef();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const router = useRouter();

    function switchAuthModeHandler() {
        console.log('submitted');
    }

    async function submitHandler(event) {
        event.preventDefault();
    
        const enteredFirstName = firstNameInputRef.current.value;
        const enteredLastName = lastNameInputRef.current.value;
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
   
        // optional: Add validation
    
        if (session) {
          const result = await signIn('credentials', {
            redirect: false,
            email: enteredEmail,
            password: enteredPassword,
          });
    
          if (!result.error) {
            // set some auth state
            router.replace('/profile');
          }
        } else {
          try {
            const result = await createUser(
                enteredFirstName, 
                enteredLastName, 
                enteredEmail, 
                enteredPassword);
          } 
          catch (error) {
            console.log(error);
          }
        }
    }

    return (
        <form onSubmit={submitHandler}>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">{session ? 'Login' : 'Sign Up'}</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Complete the form below to create a new profile on our site.</p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className={`sm:col-span-3 ${session ? 'hidden' : ''}`}>
                            <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">First name</label>
                            <div className="mt-2">
                                <input type="text" 
                                    name="firstName" 
                                    id="firstName" 
                                    autoComplete="given-name" 
                                    className="block w-full rounded-md border-0 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 
                                    ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
                                    focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                                    required
                                    ref={firstNameInputRef} />
                            </div>
                        </div>
                        <div className={`sm:col-span-3 ${session ? 'hidden' : ''}`}>
                            <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">Last name</label>
                            <div className="mt-2">
                                <input type="text" 
                                    name="lastName" 
                                    id="lastName" 
                                    autoComplete="given-name" 
                                    className="block w-full rounded-md border-0 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 
                                    ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
                                    focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                                    required
                                    ref={lastNameInputRef} />
                            </div>
                        </div>
                        <div className="sm:col-span-6">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                            <div className="mt-2">
                                <input id="email" 
                                    name="email" 
                                    type="email" 
                                    autoComplete="email" 
                                    className="block w-full rounded-md border-0 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset 
                                    ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 
                                    sm:text-sm sm:leading-6" 
                                    required
                                    ref={emailInputRef} />
                            </div>
                        </div>
                        <div className="sm:col-span-6">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                            <div className="mt-2">
                                <input id="password" 
                                    name="password" 
                                    type="password" 
                                    autoComplete="password" 
                                    className="block w-full rounded-md border-0 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset 
                                    ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 
                                    sm:text-sm sm:leading-6" 
                                    required
                                    ref={passwordInputRef} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                <button type="submit" 
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold 
                    text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 
                    focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={switchAuthModeHandler}>
                    {session ? 'Login with existing account' :  'Create new account'}
                </button>
            </div>
        </form>
    )
}

async function createUser(firstName, lastName, email, password) {
    const response = await fetch('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ 
            firstName,
            lastName,
            email, 
            password 
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!');
    }
    else {
        console.log('data from Create User', data);
        const result = await signIn('credentials', {
            email: data.user.email,
            password: data.user.password,
        });

        console.log('sign in result', result);
    }

    return data;
}