import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { TournamentService } from '../services/tournament.service';
import { CreateTournamentDto, UpdateTournamentDto } from '../dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags("Tournament")
@Controller('tournament')
export class TournamentController {
  constructor(private readonly tournamentService: TournamentService) {}

  @Post("/create")
  create(@Body() createTournamentDto: CreateTournamentDto) {
    return this.tournamentService.create(createTournamentDto);
  }

  @Get("/all")
  findAll() {
    return this.tournamentService.findAllTournaments();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tournamentService.findOne(+id);
  }

  @Put('update/:id')
  @ApiBody({ type: CreateTournamentDto })
  update(@Param('id') id: string, @Body() updateTournament: UpdateTournamentDto) {
    return this.tournamentService.updateTournament(+id, updateTournament);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.tournamentService.deleteTournament(+id);
  }
}
