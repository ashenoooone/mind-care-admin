'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { getFormButtonText } from '@/shared/lib/get-form-button-text';
import { useState } from 'react';

export default function AuthForm() {
  const [password, setPassword] =
    useState('');

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>
          Авторизация
        </CardTitle>
        <CardDescription>
          Введите пароль для авторизации
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Input
          type="password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          className="w-full"
        >
          {getFormButtonText({
            state: 'idle',
            mapper: {
              idle: 'Авторизоваться',
            },
          })}
        </Button>
      </CardFooter>
    </Card>
  );
}
