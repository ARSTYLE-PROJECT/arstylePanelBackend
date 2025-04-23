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
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { createMessageSchema } from './dto/create-message.dto';
import { updateMessageSchema } from './dto/update-message.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('messages')
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new message' })
  @ApiBody({ type: CreateMessageDto })
  @ApiResponse({
    status: 201,
    description: 'The message has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(
    @Body(new ZodValidationPipe(createMessageSchema))
    createMessageDto: CreateMessageDto,
  ) {
    return this.messagesService.create(createMessageDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all messages' })
  @ApiResponse({ status: 200, description: 'Return all messages.' })
  findAll() {
    return this.messagesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a message by id' })
  @ApiParam({ name: 'id', description: 'Message ID', type: 'number' })
  @ApiResponse({ status: 200, description: 'Return the message.' })
  @ApiResponse({ status: 404, description: 'Message not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.messagesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a message' })
  @ApiParam({ name: 'id', description: 'Message ID', type: 'number' })
  @ApiBody({ type: UpdateMessageDto })
  @ApiResponse({
    status: 200,
    description: 'The message has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Message not found.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateMessageSchema))
    updateMessageDto: UpdateMessageDto,
  ) {
    return this.messagesService.update(id, updateMessageDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a message' })
  @ApiParam({ name: 'id', description: 'Message ID', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'The message has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Message not found.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.messagesService.remove(id);
  }
}
