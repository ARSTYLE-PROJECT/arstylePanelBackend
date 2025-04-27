import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Clients')
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new client' })
  @ApiBody({ type: CreateClientDto })
  @ApiResponse({
    status: 201,
    description: 'The client has been successfully created.',
    type: CreateClientDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all clients' })
  @ApiResponse({
    status: 200,
    description: 'Return all clients.',
    type: [CreateClientDto],
  })
  findAll() {
    return this.clientsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a client by id' })
  @ApiParam({ name: 'id', description: 'Client ID', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Return the client.',
    type: CreateClientDto,
  })
  @ApiResponse({ status: 404, description: 'Client not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.clientsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a client' })
  @ApiParam({ name: 'id', description: 'Client ID', type: 'number' })
  @ApiBody({ type: UpdateClientDto })
  @ApiResponse({
    status: 200,
    description: 'The client has been successfully updated.',
    type: CreateClientDto,
  })
  @ApiResponse({ status: 404, description: 'Client not found.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    return this.clientsService.update(id, updateClientDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a client' })
  @ApiParam({ name: 'id', description: 'Client ID', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'The client has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Client not found.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.clientsService.remove(id);
  }
}
