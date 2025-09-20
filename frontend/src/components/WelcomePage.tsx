import React from 'react';
import { Button, Card, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/form');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <div className="text-center">
          <Title level={2} className="text-blue-600 mb-4">
            Добро пожаловать!
          </Title>
          <Paragraph className="text-gray-600 mb-8 text-lg">
            Мы рады приветствовать вас в нашем сервисе. Здесь вы можете отправить 
            нам сообщение, и мы обязательно свяжемся с вами в ближайшее время.
          </Paragraph>
          <Button 
            type="primary" 
            size="large" 
            onClick={handleNext}
            className="bg-blue-600 hover:bg-blue-700 px-8 py-4 h-auto text-lg"
          >
            Далее
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default WelcomePage;
