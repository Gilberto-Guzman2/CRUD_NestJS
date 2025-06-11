# Config

    nest new .
    npm install @nestjs/config
    npm install prisma @prisma/client
    npm install -D prisma
    npx prisma init
    npx prisma migrate dev --name init
    npx prisma generate
    npm run start:dev

# Fix Prisma Import Error

    Remove-Item -Recurse -Force node_modules
    Remove-Item -Recurse -Force .next
    npm install
    npx prisma generate
