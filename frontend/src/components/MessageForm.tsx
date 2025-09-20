import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Card, Form, Input, Typography, message as antMessage } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FormData } from '../types';
import { API_URL } from "../Config";

const { Title, Text } = Typography;
const { TextArea } = Input;

const MessageForm: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [informer, responseInfoElement] = antMessage.useMessage();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      // Отправка на сервер
      const response = await fetch(API_URL + '/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const serverData = await response.json();
      if (serverData.success) {
        informer.success('Сообщение успешно отправлено!');
        reset();
      } else {
        console.log(serverData)
        informer.error(serverData.error);
      }
    } catch (error) {
      informer.error('Произошла ошибка при отправке сообщения');
      console.log(error)
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <Title level={3} className="text-center text-blue-600 mb-6">
          Отправка сообщения
        </Title>
        
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          <Form.Item
            label="Имя"
            validateStatus={errors.name ? 'error' : ''}
            help={errors.name?.message}
          >
            <Controller
                name="name"
                rules={{
                  required: "Имя должно содержать минимум 2 символа",
                  minLength: {
                    value: 2,
                    message: "Имя должно содержать минимум 2 символа"
                  }
                }}
                control={control}
                render={({ field }) => {
                  return (<Input
                      {...field}
                      type="text"
                      size="large"
                      placeholder="Введите ваше имя"
                      disabled={isSubmitting}
                  />)
                }}
            />
          </Form.Item>

          <Form.Item
            label="Телефон"
            validateStatus={errors.phone ? 'error' : ''}
            help={errors.phone?.message}
          >
            <Controller
                name="phone"
                rules={{
                  required: "Введите корректный белорусский номер телефона",
                  pattern: {
                    value: /^(\+375|80)(25|29|33|44)\d{7}$/,
                    message: "Введите корректный белорусский номер телефона"
                  }
                }}
                control={control}
                render={({ field }) => {
                  return (<Input
                      {...field}
                      type="text"
                      size="large"
                      placeholder="+375 или 80..."
                      disabled={isSubmitting}
                  />)
                }}
            />
          </Form.Item>

          <Form.Item
            label="Сообщение"
            validateStatus={errors.message ? 'error' : ''}
            help={errors.message?.message}
          >
            <Controller
                name="message"
                rules={{
                  required: "Сообщение должно содержать минимум 2 символа",
                  minLength: {
                    value: 2,
                    message: "Сообщение должно содержать минимум 2 символа"
                  },
                }}
                control={control}
                render={({ field }) => {
                  return (<TextArea
                      {...field}
                      rows={4}
                      size="large"
                      placeholder="Введите ваше сообщение..."
                      disabled={isSubmitting}
                  />)
                }}
            />
          </Form.Item>

          <div className="flex gap-4">
            <Button
              type="default"
              size="large"
              onClick={() => navigate('/')}
              disabled={isSubmitting}
              className="flex-1"
            >
              Назад
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={isSubmitting}
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              Отправить
            </Button>
            {responseInfoElement}
          </div>
        </Form>

        <Text type="secondary" className="block text-center mt-4 text-sm">
          Поддерживаемые форматы: +375 (25,29,33,44) XXXXXXX или 80 (25,29,33,44) XXXXXXX
        </Text>
      </Card>
    </div>
  );
};

export default MessageForm;
