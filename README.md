# ONDA FAME

Лендинг маркетингового агентства полного цикла для музыкантов. Русский язык, только тёмная тема,
адаптив от 320px.

## Запуск

Пакетный менеджер — [bun](https://bun.sh).

```bash
bun install
bun run dev      # next dev на 0.0.0.0:3000

bun run build    # прод-сборка
bun run start    # прод-сервер после сборки
```

Проверки: `bunx tsc --noEmit` (типы), `bun run lint` (ESLint), `bun run format` (Prettier),
`bun run check` (knip).

## Переменные окружения

Скопируйте `.env.example` в `.env` и заполните:

| Переменная                 | Зачем                                                     |
| -------------------------- | --------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`     | canonical, `sitemap.xml`, `robots.txt`, `og:url`           |
| `NEXT_PUBLIC_TELEGRAM_URL` | адрес, куда ведут все кнопки «Связаться с нами»            |

## Деплой

Сайт публикуется на GitHub Pages через `.github/workflows/nextjs.yml` — на каждый push в `main`.

Один раз нужно включить Pages: **Settings → Pages → Source → GitHub Actions**. Без этого workflow
соберётся, но шаг деплоя упадёт.

Workflow ставит зависимости через Bun (у проекта `bun.lock`), а сборку запускает настоящим Node.
Статический экспорт включается только там, переменной `GITHUB_PAGES=true`: постоянно держать
`output: 'export'` нельзя, иначе перестанут работать `next dev` и `next start`.

На Pages сайт живёт в подкаталоге `/<repo>`, поэтому workflow передаёт `PAGES_BASE_PATH` и
`NEXT_PUBLIC_SITE_URL` из `actions/configure-pages` — от них зависят `basePath`, canonical,
`sitemap.xml`, `robots.txt` и `og:url`.

Собрать экспорт локально:

```bash
GITHUB_PAGES=true PAGES_BASE_PATH=/ondaFAME NEXT_PUBLIC_SITE_URL=https://kerrove.github.io/ondaFAME bun run build
# результат в out/
```

## Где что лежит

- `src/app` — роут, метаданные, `sitemap.ts`, `robots.ts`, `opengraph-image.png`, `manifest.ts`.

Превью для соцсетей — статический файл `src/app/opengraph-image.png` (1200×630) рядом с
`opengraph-image.alt.txt`; Next сам подставляет из них `og:image` и `twitter:image`. Раньше картинка
рисовалась на сборке через `next/og`, но это тянуло в билд WASM (`resvg`, `yoga`) ради изображения,
которое никогда не меняется. Чтобы обновить превью — замените PNG.
- `src/components` — секции страницы, по папке на секцию.
- `src/ui` — переиспользуемые примитивы (Button, Carousel, Avatar, Reveal, GridBackdrop).

Папки — в нижнем регистре через дефис, файлы названы по компоненту, `index.tsx` не используется:
`src/components/cta-band/CtaBand.tsx`.
- `src/constants` — **весь текст и данные сайта**: услуги, кейсы, команда, F.A.Q., бренд.
- `PRODUCT.md` — продуктовая правда, `DESIGN.md` — визуальная система.

Контент правится только в `src/constants` — вёрстку трогать не нужно.

## Что нужно заменить перед публикацией

Перечислено в конце `PRODUCT.md` («Не решено»): домен, адрес Telegram, фотографии команды
(`photo: null` в `src/constants/team.ts`), аватар артиста в кейсе, значения января и февраля на
графике кейса (сейчас интерполяция между подтверждёнными точками).
