'use client';

import { useState, useCallback } from 'react';

import { EyeIcon, EyeOffIcon } from 'lucide-react';
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

export default function AuthForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    username: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = useCallback(() => {
    let isValid = true;
    const newErrors = { username: '', password: '' };

    if (!username.trim()) {
      newErrors.username = 'Имя пользователя обязательно';
      isValid = false;
    }

    if (password.length < 6) {
      newErrors.password =
        'Пароль должен содержать минимум 6 символов';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }, [username, password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    // Имитация отправки данных на сервер
    await new Promise((resolve) =>
      setTimeout(resolve, 1500)
    );
    setIsLoading(false);

    console.log('Форма отправлена', { username, password });
    // Здесь вы бы отправляли данные на ваш сервер
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Авторизация</CardTitle>
        <CardDescription>
          Введите ваши учетные данные для входа
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="username"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Имя пользователя
            </label>
            <Input
              id="username"
              type="text"
              placeholder="Введите имя пользователя"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={
                errors.username ? 'border-red-500' : ''
              }
            />
            {errors.username && (
              <p className="text-sm text-red-500">
                {errors.username}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Пароль
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Введите пароль"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className={
                  errors.password ? 'border-red-500' : ''
                }
              />
              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500">
                {errors.password}
              </p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Загрузка...' : 'Войти'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
