import useInjector from "../hooks/useInjector"

const ProviderAuthentication = () => {
  const { injectHTTP } = useInjector();
  
  return {
    doRegis: {
      ...injectHTTP(["auth01", "register", "v1"]),
    },
    verifyRegis: {
      ...injectHTTP(["auth01", "register", "v1", "verify"]),
    },
    newTokenRegis: {
      ...injectHTTP(["auth01", "register", "v1", "newtoken"]),
    },        
    login: {
      ...injectHTTP(["auth01", "login", "v1"]),
    },
    forgotpwd: {
      ...injectHTTP(["auth01", "forgotpwd", "v1"]),
    },
    verifyForgotPassword: {
      ...injectHTTP(["auth01", "forgotpwd", "v1", "verify"]),
    },
    confirmForgotPassword: {
      ...injectHTTP(["auth01", "forgotpwd", "v1","confirm"]),
    },
  }
}

export default ProviderAuthentication;