import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { PlayersService } from '../services/players.service';
import { CreatePlayerDto } from '../dto/create-player.dto';
import { UpdatePlayerDto } from '../dto/update-player.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags("Players")
@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post("/create")
  create(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playersService.create(createPlayerDto);
  }

  @Get("/all")
  findAll() {
    return this.playersService.findAllPlayers();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playersService.findOne(+id);
  }

  @Put('update/:id')
  @ApiBody({ type: CreatePlayerDto })
  update(@Param('id') id: string, @Body() updatePlayer: UpdatePlayerDto) {
    return this.playersService.updatePlayer(+id, updatePlayer);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.playersService.deletePlayer(+id);
  }
}
