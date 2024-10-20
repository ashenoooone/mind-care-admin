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
import { useMutation } from '@tanstack/react-query';
import { LOGIN_MUTATION_OPTIONS } from '../model/hooks';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/shared/config/router-config';
import { mapLoginErrorToText } from '../model/utils';

export default function AuthForm() {
  const [password, setPassword] = useState('');
  const router = useRouter();

  const login = useMutation({
    ...LOGIN_MUTATION_OPTIONS,
    onSuccess: () => router.push(ROUTES.main),
  });

  const onLoginClick = () => {
    login.mutate({
      password,
    });
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Авторизация</CardTitle>
        <CardDescription>
          Введите пароль для авторизации
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </CardContent>
      <CardFooter>
        <Button
          onClick={onLoginClick}
          type="submit"
          className="w-full"
        >
          {getFormButtonText({
            state: login.status,
            mapper: {
              idle: 'Авторизоваться',
              error: login.isError
                ? mapLoginErrorToText(login.error.message)
                : 'Ошибка',
            },
          })}
        </Button>
      </CardFooter>
    </Card>
  );
}
