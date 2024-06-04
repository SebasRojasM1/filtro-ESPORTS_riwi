import { Controller, Get, Post, Body, Param, Delete, Put, ValidationPipe, ParseIntPipe, Query } from '@nestjs/common';
import { TournamentService } from '../services/tournament.service';
import { CreateTournamentDto, UpdateTournamentDto } from '../dto';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/libs/pagination/pagination.dto';

@ApiTags("Tournament")
@Controller('tournament')
export class TournamentController {
  constructor(private readonly tournamentService: TournamentService) {}

  @Post("/create")
  @ApiOperation({ summary: 'Create a tournament to the system.', description: 'Create a tournament to access the system.' })
  @ApiResponse({status: 201, description: 'Tournament created successfully.'})
  @ApiResponse({status: 400, description: 'The data entered to create the tournament is invalid.'})
  @ApiResponse({status: 500, description: 'a internal server error occurred while creating the tournament.'})
  create(@Body(new ValidationPipe()) createTournamentDto: CreateTournamentDto) {
    return this.tournamentService.createTournament(createTournamentDto);
  }

  @Get("/all")
  @ApiOperation({ summary: 'Find all the tournaments of the system.', description: 'View all tournaments registered in the system.' })
  @ApiResponse({status: 200, description: 'All tournaments were found successfully.'})
  @ApiResponse({status: 404, description: 'No tournaments were found in the system.'})
  @ApiResponse({status: 500,description: 'An internal server error occurred while searching for the tournaments.'})
  findAll() {
    return this.tournamentService.findAllTournaments();
  }

  @Get("/search")
  @ApiOperation({ summary: 'Find all the tournaments by Search.', description: 'View all the tournaments registered in the system by a search.' })
  @ApiQuery({ name: 'limit', required: true, description: 'Número de elementos por página', example: 10 })
  @ApiQuery({ name: 'order', required: true, description: 'Orden de los resultados', enum: ['ASC', 'DESC'] })
  @ApiQuery({ name: 'page', required: true, description: 'Página actual', example: 1 })
  @ApiQuery({ name: 'search', required: true, description: 'Término de búsqueda', example: 'nameTournament' })
  @ApiQuery({ name: 'sortBy', required: true, description: 'Campo por el cual ordenar', example: 'createDate' })
  findBySearch(@Query(new ValidationPipe()) pagination: PaginationDto) {
    return this.tournamentService.findBySearch(pagination);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find the tournament by ID of the system.', description: 'View a specific tournament registered in the database.' })
  @ApiResponse({status: 200, description: 'Tournament found successfully.',})
  @ApiResponse({status: 404, description: 'Tournament with the entered ID not found.'})
  @ApiResponse({status: 500, description: 'An internal server error occurred while searching for the tournament.'})
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tournamentService.findOne(+id);
  }

  @Put('update/:id')
  @ApiOperation({ summary: 'Update an tournament to the system.', description: 'Update a specific tournament registered in the database.' })
  @ApiResponse({status: 200, description: 'The tournament updated successfully.'})
  @ApiResponse({status: 404, description: 'The tournament with the entered ID not found.'})
  @ApiResponse({status: 500, description: 'An internal server error occurred while updating the tournament.'})
  @ApiBody({ type: CreateTournamentDto })
  update(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe()) updateTournament: UpdateTournamentDto) {
    return this.tournamentService.updateTournament(id, updateTournament);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete a tournament to the system.', description: 'Delete a tournament of the system.' })
  @ApiResponse({status: 200, description: 'Tournament deleted successfully.'})
  @ApiResponse({status: 404, description: 'Tournament with the entered ID not found.'})
  @ApiResponse({status: 500, description: 'An internal server error occurred while deleting the tournament.'})
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tournamentService.deleteTournament(+id);
  }
}
