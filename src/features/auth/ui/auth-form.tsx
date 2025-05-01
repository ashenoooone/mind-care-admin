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
import { LocalStorageManager } from '@/shared/lib/local-storage-manager';

export default function AuthForm() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const loginMutation = useMutation({
    ...LOGIN_MUTATION_OPTIONS,
    onSuccess: (response) => {
      LocalStorageManager.setItem(
        'token',
        response.data.token
      );
      router.push(ROUTES.main);
    },
  });

  const onLoginClick = () => {
    loginMutation.mutate({
      password,
      login,
    });
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Авторизация</CardTitle>
        <CardDescription>
          Введите логин и пароль для авторизации
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Input
          data-testid="login-input"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <Input
          data-testid="password-input"
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
          data-testid="login-button"
        >
          {getFormButtonText({
            state: loginMutation.status,
            mapper: {
              idle: 'Авторизоваться',
              error: loginMutation.isError
                ? mapLoginErrorToText(
                    loginMutation.error.message
                  )
                : 'Ошибка',
            },
          })}
        </Button>
      </CardFooter>
    </Card>
  );
}
