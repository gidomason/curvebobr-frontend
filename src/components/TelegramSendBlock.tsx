import { useState } from 'react';

export default () => {
  const [username, setUsername] = useState<string>('');

  const onButtonClick = () => {
    if (username[0] === '@') {
      console.log(username.slice(1));
    } else {
      console.log(username);
    }
    setUsername('');
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <h2 className="text-xl">Введите свой Telegram Username</h2>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="mx-auto border border-gray-200 rounded-lg w-96 p-2"
      />
      <button
        onClick={onButtonClick}
        className="bg-orange-500 text-white px-5 py-3 rounded-xl font-bold"
      >
        Обобрено
      </button>
    </div>
  );
};
