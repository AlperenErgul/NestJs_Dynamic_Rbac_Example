import {Module} from '@nestjs/common';
import {ProjectController} from "./controllers/project.controller";

@Module({
    imports: [],
    controllers: [
        ProjectController
    ]
})
export class ProjectModule {
}
