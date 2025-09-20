import express from 'express';
import { query } from '../models/database.js';
import { Message, CreateMessageRequest, ApiResponse } from '../types/Message';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await query('SELECT * FROM messages ORDER BY id ASC');
    const messages: Message[] = result.rows;
    
    const response: ApiResponse<Message[]> = {
      success: true,
      data: messages
    };
    
    res.json(response);
  } catch (err) {
    console.error('Error fetching messages:', err);
    
    const response: ApiResponse<never> = {
      success: false,
      error: 'Internal server error'
    };
    
    res.status(500).json(response);
  }
});

router.post('/', async (req, res) => {
  const { name, phone, message }: CreateMessageRequest = req.body;
  
  if (!name || !phone || !message) {
    const response: ApiResponse<never> = {
      success: false,
      error: 'Предоставлена неполная информация'
    };

    return res.status(400).json(response);
  }

  try {
    const result = await query(
      'INSERT INTO messages (name, phone, text) VALUES ($1, $2, $3) RETURNING *',
      [name, phone, message]
    );

    const newMessage: Message = result.rows[0];
    
    const response: ApiResponse<Message> = {
      success: true,
      data: newMessage,
      message: 'Сообщение успешно создано'
    };
    
    res.status(201).json(response);
  } catch (err: any) {
    console.error('Error creating Message:', err);
    
    let errorMessage = 'Internal server error';
    if (err.code === '23505') {
      errorMessage = 'phone already exists';
    }
    
    const response: ApiResponse<never> = {
      success: false,
      error: errorMessage
    };
    
    res.status(err.code === '23505' ? 400 : 500).json(response);
  }
});

export default router;
