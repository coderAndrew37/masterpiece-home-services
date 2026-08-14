// src/app/api/testimonials/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { writeClient } from '@/lib/sanity/writeClient';

interface SubmissionBody {
  name: string;
  rating: number;
  comment: string;
  email?: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  let body: SubmissionBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { name, rating, comment, email } = body;

  if (!name?.trim() || !comment?.trim() || typeof rating !== 'number' || rating < 1 || rating > 5) {
    return NextResponse.json({ error: 'Missing or invalid fields' }, { status: 400 });
  }

  try {
    if (rating >= 4) {
      // Positive \u2014 saved as a candidate on-site testimonial, unpublished
      // pending manual review (same moderation gate as serviceArea).
      await writeClient.create({
        _type: 'testimonial',
        name: name.trim(),
        rating,
        comment: comment.trim(),
        source: 'Direct',
        published: false,
        publishedAt: new Date().toISOString(),
      });
    } else {
      // Below 4 \u2014 private feedback ONLY. Never a testimonial doc, never
      // public. Internal follow-up.
      await writeClient.create({
        _type: 'feedback',
        name: name.trim(),
        rating,
        comment: comment.trim(),
        email: email?.trim() || undefined,
        resolved: false,
        createdAt: new Date().toISOString(),
      });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to save submission:', error);
    return NextResponse.json({ error: 'Failed to save submission' }, { status: 500 });
  }
}