export const signup = async ({name,phone,password}) => ({ success:true, userId: Date.now().toString() });
export const verifyOtp = async ()=> ({ success:true });
export const setPasscode = async ()=> ({ success:true });
export const setTxnPin = async ()=> ({ success:true });
export const login = async ({phone,password}) => ({ success:true, user: { id:'demo', name:'Ada', phone, type:'user', kyc:'basic' } });
export const uploadKyc = async ()=> ({ success:true, kyc:'verified' });
