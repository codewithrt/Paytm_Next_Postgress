FROM node:20

WORKDIR /app

# ENV DATABASE_URL "postgresql://postgres:postgres@neondatabase:5432/cms?schema=public"

COPY package* .
COPY ./prisma .

RUN npm install
# RUN npx prisma migrate dev
RUN npx prisma generate
# RUN npx prisma studio

COPY . .

EXPOSE 3000

CMD ["npm","run","dev"]