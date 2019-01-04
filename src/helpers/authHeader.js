const authHeader = () => {
  const token = JSON.parse(localStorage.getItem('token'));

  if (token) {
    return { 
      token
     }
  }
}

export default authHeader;
