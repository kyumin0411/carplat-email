import { HttpModule, Module } from '@nestjs/common';
import { CalculateManager } from 'app/util/calculate.manager';
import { MapManager } from 'app/util/map.manager';
import { HttpRequestModule } from 'raidea_module/http/http.module';
import { RaideaModule } from 'raidea_module/raidea.module';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';

@Module({
  imports: [HttpModule, HttpRequestModule, RaideaModule],
  controllers: [EmailController],
  providers: [EmailService, MapManager, CalculateManager],
})
export class EmailModule {}
