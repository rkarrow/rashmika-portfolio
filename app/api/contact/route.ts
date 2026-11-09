import { NextResponse } from 'next/server';
import { connectToDatabase, saveLocalMessage, getLocalMessages } from '@/lib/db';
import Message from '@/models/Message';
import { isUserAdmin } from '@/lib/auth';

export async function GET() {
  try {
    if (!isUserAdmin()) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const db = await connectToDatabase();
    if (db) {
      try {
        const msgs = await Message.find().sort({ createdAt: -1 }).lean();
        if (msgs && msgs.length > 0) {
          return NextResponse.json({
            success: true,
            data: msgs.map((m: any) => ({ ...m, id: m._id.toString() })),
          });
        }
      } catch (err: any) {
        console.warn('MongoDB message fetch error:', err.message);
      }
    }

    const localMsgs = getLocalMessages();
    return NextResponse.json({ success: true, data: localMsgs });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Error fetching messages' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Please provide name, email, and message' },
        { status: 400 }
      );
    }

    const db = await connectToDatabase();
    if (db) {
      try {
        const created = await Message.create({
          name,
          email,
          subject: subject || 'Portfolio Inquiry',
          message,
          read: false,
        });

        return NextResponse.json({
          success: true,
          message: 'Your message has been sent successfully! Rashmika will get back to you soon.',
          data: { id: created._id.toString() },
        });
      } catch (err: any) {
        console.warn('MongoDB save message error, fallback to local storage:', err.message);
      }
    }

    const saved = saveLocalMessage({
      name,
      email,
      subject: subject || 'Portfolio Inquiry',
      message,
    });

    return NextResponse.json({
      success: true,
      message: 'Your message has been sent successfully! Rashmika will get back to you soon.',
      data: saved,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Error sending message' },
      { status: 500 }
    );
  }
}
