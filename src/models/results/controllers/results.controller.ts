import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ResultsService } from '../services/results.service';
import { CreateResultDto, UpdateResultDto } from '../dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags("Results")
@Controller('results')
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @Post("/create")
  create(@Body() createResultDto: CreateResultDto) {
    return this.resultsService.create(createResultDto);
  }

  @Get("/all")
  findAll() {
    return this.resultsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resultsService.findOne(+id);
  }

  @Put('update/:id')
  @ApiBody({ type: CreateResultDto })
  update(@Param('id') id: string, @Body() updateResultDto: UpdateResultDto) {
    return this.resultsService.update(+id, updateResultDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.resultsService.remove(+id);
  }
}
