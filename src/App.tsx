import { useEffect, useState } from 'react';
import ConnectButton from './components/ConnectButton';
import { useAccount } from 'wagmi';
import TelegramSendBlock from './components/TelegramSendBlock';
import SignButton from './components/SignButton';
import img from './assets/main.jpg';
import Logo from './assets/logo.png';
import Footer from './components/Footer';

function App() {
  const { address } = useAccount();
  const [userId, setUserId] = useState<string>('');
  const [signed, setSigned] = useState<boolean>(false);

  const onSignedSuccess = (data: `0x${string}`) => {
    setSigned(!!data);
  };

  useEffect(() => {
    let url = window.location.href;
    setUserId(url.slice(url.indexOf('user_id')).split('=')[1]);
    console.log('UserID: ', userId);
  }, []);

  return (
    <div className="container mx-auto pt-12">
      <header className="flex justify-between items-center mb-20">
        <div className="flex items-center gap-3">
          <span>
            <img className="w-10" src={Logo} alt="logo" />
          </span>
          <h2 className="text-2xl font-bold">CURVEBOBR</h2>
        </div>
        <div>
          <ConnectButton />
        </div>
      </header>

      <div className="flex justify-between items-center w-[850px] mx-auto">
        <div>
          {!address && (
            <h2 className="text-center text-2xl">
              Пожалуйста, подключите кошелек
            </h2>
          )}

          {address &&
            (signed ? (
              <>
                <div className="text-center font-bold text-lg mb-5">
                  <span className="text-2xl mr-2">✅</span> Сообщение успешно
                  подписано
                </div>
                <TelegramSendBlock />
              </>
            ) : (
              <div className="flex flex-col items-center justify-center gap-5">
                <h2 className="text-xl">Пожалуйста, подпишите сообщение</h2>
                <SignButton address={address} setSigned={onSignedSuccess} />
              </div>
            ))}
        </div>
        <div>
          <img className="w-96 rounded-3xl" src={img} alt="logo" />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
