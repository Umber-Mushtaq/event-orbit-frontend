import logo from "../../../assets/logo.png";
function AppLogo() {
  return (
    <div className=' flex items-center gap-3'>
      <img src={logo} alt='Logo' className='w-12 h-auto object-contain' />
    </div>
  );
}

export default AppLogo;
