'use server'

export const logInAction = async (e) => {
  
  console.log(e.get('email'),e.get('password'))
}