import {
  Body,
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Post,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import {
  AddBlockItemDto,
  BlockItemDto,
  BlockListDto,
  BlockListQueryDto,
} from './dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { sessionInfo } from 'src/auth/session-info.decorator';
import { GetSessionInfoDto } from 'src/auth/dto';
import { BlockListService } from './block-list.service';

@Controller('block-list')
@UseGuards(AuthGuard)
export class BlockListController {
  constructor(private blockListService: BlockListService) {}

  @Get()
  @ApiOkResponse({
    type: BlockListDto,
  })
  getList(
    @Query() query: BlockListQueryDto,
    @sessionInfo() session: GetSessionInfoDto,
  ) {
    return this.blockListService.getByUser(session.id, query);
  }

  @Post('item')
  @ApiCreatedResponse({
    type: BlockItemDto,
  })
  addBlockItem(
    @Body() body: AddBlockItemDto,
    @sessionInfo() session: GetSessionInfoDto,
  ) {
    return this.blockListService.addItem(session.id, body);
  }

  @Delete('item/:id')
  @ApiOkResponse({
    type: BlockItemDto,
  })
  async removeBlockItem(
    @Param('id', ParseIntPipe) id: number,
    @sessionInfo() session: GetSessionInfoDto,
  ) {
    return await this.blockListService.removeItem(session.id, id);
  }
}
