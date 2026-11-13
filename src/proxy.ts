import { type NextRequest, NextResponse } from 'next/server'

import { ADMIN_REALM, isAdminConfigured, isAuthorized } from '@/server/admin-auth'

/**
 * Пускает в /admin только по паролю. Остальной сайт через proxy не проходит вовсе — matcher
 * ниже, поэтому на скорость публичной страницы он не влияет.
 */
export function proxy(request: NextRequest) {
	if (!isAdminConfigured()) {
		return new NextResponse('Админка выключена: на сервере не задан ADMIN_PASSWORD.', {
			status: 503,
			headers: { 'Content-Type': 'text/plain; charset=utf-8' }
		})
	}

	if (isAuthorized(request.headers.get('authorization'))) return NextResponse.next()

	return new NextResponse('Нужен логин и пароль.', {
		status: 401,
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'WWW-Authenticate': `Basic realm="${ADMIN_REALM}", charset="UTF-8"`
		}
	})
}

export const config = {
	matcher: ['/admin', '/admin/:path*']
}
