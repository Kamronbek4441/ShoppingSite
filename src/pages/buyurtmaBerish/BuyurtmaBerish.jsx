import { useNavigate } from 'react-router-dom';

function BuyurtmaBerish() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/buyurtma');
  };

  return (
    <button onClick={handleClick}>
      Buyurtma berish
    </button>
  );
}

export default BuyurtmaBerish
