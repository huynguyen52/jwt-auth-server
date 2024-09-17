import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './module/database/database.module';
import { UsersModule } from './module/users/users.module';
import { AuthenticationModule } from './module/authentication/authentication.module';
import { TodoModule } from './module/todo/todo.module';
import { PostsModule } from './module/posts/posts.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    UsersModule,
    AuthenticationModule,
    TodoModule,
    PostsModule,
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
