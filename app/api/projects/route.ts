import { NextRequest, NextResponse } from 'next/server';
import { projectService } from '@/features/projects/project-service';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const status = searchParams.get('status');
    const developer = searchParams.get('developer');

    const result = await projectService.getAll({
      page,
      limit,
      status: status as any,
      developer: developer || undefined,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}
