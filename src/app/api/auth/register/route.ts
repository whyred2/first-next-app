import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
    const { email, password, username } = await request.json();

    // Проверка, существует ли уже пользователь с таким email
    const existingUser = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if (existingUser) {
        return NextResponse.json({ message: 'Пользователь с такой почтой уже зарегистрирован' }, { status: 409 });
    }

    // Хеширование пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создание нового пользователя
    const newUser = await prisma.user.create({
        data: {
            email,
            username,
            password: hashedPassword,
        }
    });

    return NextResponse.json({ user: newUser }, { status: 201 });
}
