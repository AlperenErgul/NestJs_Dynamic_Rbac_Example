import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import process from "process";
import {ConfigService} from "@nestjs/config";
import {DataSource} from "typeorm";
import {createRootUser} from "./core/setup/root-user";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get(ConfigService);
    const dataSource = app.get(DataSource);
    console.log('Running createRootUser function...');
    await createRootUser(dataSource, configService);

    const port = configService.get('PORT') || 6060;

    await app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
}

bootstrap();
