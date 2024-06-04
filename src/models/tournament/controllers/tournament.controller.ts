import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { TournamentService } from '../services/tournament.service';
import { CreateTournamentDto } from '../dto/create-tournament.dto';
import { UpdateTournamentDto } from '../dto/update-tournament.dto';

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
  update(@Param('id') id: string, @Body() updateTournament: UpdateTournamentDto) {
    return this.tournamentService.updateATournament(+id, updateTournament);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tournamentService.deleteTournament(+id);
  }
}
