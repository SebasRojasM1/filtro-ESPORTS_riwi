import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ValidationPipe, ParseIntPipe, Query } from '@nestjs/common';
import { PlayersService } from '../services/players.service';
import { CreatePlayerDto } from '../dto/create-player.dto';
import { UpdatePlayerDto } from '../dto/update-player.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/libs/pagination/pagination.dto';

@ApiTags("Players")
@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post("/create")
  @ApiOperation({ summary: 'Create a player to the system.', description: 'Create a player to access the system.' })
  @ApiResponse({status: 201, description: 'Player created successfully.'})
  @ApiResponse({status: 400, description: 'The data entered to create the player is invalid.'})
  @ApiResponse({status: 500, description: 'An internal server error occurred while creating the player.'})
  create(@Body(new ValidationPipe()) createPlayerDto: CreatePlayerDto) {
    return this.playersService.create(createPlayerDto);
  }

  @Get("/search")
  findBySearch(@Query(new ValidationPipe()) pagination: PaginationDto) {
    return this.playersService.findBySearch(pagination);
  }

  @Get("/all")
  @ApiOperation({ summary: 'Find all the players of the system.', description: 'View all players registered in the system.' })
  @ApiResponse({status: 200, description: 'All players were found successfully.'})
  @ApiResponse({status: 404, description: 'No players were found in the system.'})
  @ApiResponse({status: 500,description: 'An internal server error occurred while searching for the players.'})
  findAll() {
    return this.playersService.findAllPlayers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find the players by ID of the system.', description: 'View a specific players registered in the database.' })
  @ApiResponse({status: 200, description: 'Players found successfully.',})
  @ApiResponse({status: 404, description: 'Players with the entered ID not found.'})
  @ApiResponse({status: 500, description: 'An internal server error occurred while searching for the players.'})
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.playersService.findOne(+id);
  }

  @Put('update/:id')
  @ApiOperation({ summary: 'Update a player to the system.', description: 'Update a specific player registered in the database.' })
  @ApiResponse({status: 200, description: 'Player updated successfully.'})
  @ApiResponse({status: 404, description: 'Player with the entered ID not found.'})
  @ApiResponse({status: 500, description: 'An internal server error occurred while updating the player.'})
  @ApiBody({ type: CreatePlayerDto })
  update(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe()) updatePlayer: UpdatePlayerDto) {
    return this.playersService.updatePlayer(+id, updatePlayer);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete a player to the system.', description: 'Delete a player of the system.' })
  @ApiResponse({status: 200, description: 'Player deleted successfully.'})
  @ApiResponse({status: 404, description: 'Player with the entered ID not found.'})
  @ApiResponse({status: 500, description: 'An internal server error occurred while deleting the player.'})
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.playersService.deletePlayer(+id);
  }
}
