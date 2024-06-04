import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe, ValidationPipe, Query } from '@nestjs/common';
import { ResultsService } from '../services/results.service';
import { CreateResultDto, UpdateResultDto } from '../dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/libs/pagination/pagination.dto';

@ApiTags("Results")
@Controller('results')
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @Post("/create")
  @ApiOperation({ summary: 'Create a result to the system.', description: 'Create a result to access the system.' })
  @ApiResponse({status: 201, description: 'Result created successfully.'})
  @ApiResponse({status: 400, description: 'The data entered to create the result is invalid.'})
  @ApiResponse({status: 500, description: 'An internal server error occurred while creating the result.'})
  create(@Body(new ValidationPipe()) createResultDto: CreateResultDto) {
    return this.resultsService.create(createResultDto);
  }

  @Get("/all")
  @ApiOperation({ summary: 'Find all the results of the system.', description: 'View all results registered in the system.' })
  @ApiResponse({status: 200, description: 'All results were found successfully.'})
  @ApiResponse({status: 404, description: 'No results were found in the system.'})
  @ApiResponse({status: 500,description: 'An internal server error occurred while searching for the results.'})
  findAll() {
    return this.resultsService.findAllResults();
  }

  @Get("/search")
  findBySearch(@Query(new ValidationPipe()) pagination: PaginationDto) {
    return this.resultsService.findBySearch(pagination);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find the results by ID of the system.', description: 'View a specific results registered in the database.' })
  @ApiResponse({status: 200, description: 'Results found successfully.',})
  @ApiResponse({status: 404, description: 'Results with the entered ID not found.'})
  @ApiResponse({status: 500, description: 'An internal server error occurred while searching for the results.'})
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.resultsService.findOne(+id);
  }

  @Put('update/:id')
  @ApiOperation({ summary: 'Update a results to the system.', description: 'Update a specific results registered in the database.' })
  @ApiResponse({status: 200, description: 'Results updated successfully.'})
  @ApiResponse({status: 404, description: 'Results with the entered ID not found.'})
  @ApiResponse({status: 500, description: 'An internal server error occurred while updating the results.'})
  @ApiBody({ type: CreateResultDto })
  update(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe()) updateResultDto: UpdateResultDto) {
    return this.resultsService.updateResults(+id, updateResultDto);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete a result to the system.', description: 'Delete a result of the system.' })
  @ApiResponse({status: 200, description: 'Result deleted successfully.'})
  @ApiResponse({status: 404, description: 'Result with the entered ID not found.'})
  @ApiResponse({status: 500, description: 'An internal server error occurred while deleting the result.'})
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.resultsService.deleteResults(+id);
  }
}
