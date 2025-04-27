import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { LoggerModule } from './common/logger/logger.module';
import { RatesModule } from './rates/rates.module';
import { MaterialCategoriesModule } from './material-categories/material-categories.module';
import { ExpensesModule } from './expenses/expenses.module';
import { QuotesModule } from './quotes/quotes.module';
import { InvoicesModule } from './invoices/invoices.module';
import { ClientsModule } from './clients/clients.module';
import { ChargesModule } from './charges/charges.module';
import { MaterialsModule } from './materials/materials.module';
import { DocumentsModule } from './documents/documents.module';
import { PaymentsModule } from './payments/payments.module';
import { ServicesModule } from './services/services.module';
import { SignaturesModule } from './signatures/signatures.module';
import { MessagesModule } from './messages/messages.module';
import { NotificationsModule } from './notifications/notifications.module';
import { PdfImagesModule } from './pdf-images/pdf-images.module';
import { QuotedServicesModule } from './quoted-services/quoted-services.module';
import { StockSuppliersModule } from './stock-suppliers/stock-suppliers.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    LoggerModule,
    RatesModule,
    MaterialCategoriesModule,
    ExpensesModule,
    QuotesModule,
    InvoicesModule,
    ClientsModule,
    ChargesModule,
    MaterialsModule,
    DocumentsModule,
    PaymentsModule,
    ServicesModule,
    SignaturesModule,
    MessagesModule,
    NotificationsModule,
    PdfImagesModule,
    QuotedServicesModule,
    StockSuppliersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
