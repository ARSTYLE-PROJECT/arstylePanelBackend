import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { SignaturesService } from './signatures.service';
import { CreateSignatureDto } from './dto/create-signature.dto';
import { UpdateSignatureDto } from './dto/update-signature.dto';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { createSignatureSchema } from './dto/create-signature.dto';
import { updateSignatureSchema } from './dto/update-signature.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Signatures')
@Controller('signatures')
@UseGuards(AuthGuard)
export class SignaturesController {
  constructor(private readonly signaturesService: SignaturesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new signature' })
  @ApiBody({ type: CreateSignatureDto })
  @ApiResponse({
    status: 201,
    description: 'The signature has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(
    @Body(new ZodValidationPipe(createSignatureSchema))
    createSignatureDto: CreateSignatureDto,
  ) {
    return this.signaturesService.create(createSignatureDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all signatures' })
  @ApiResponse({ status: 200, description: 'Return all signatures.' })
  findAll() {
    return this.signaturesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a signature by id' })
  @ApiParam({ name: 'id', description: 'Signature ID', type: 'number' })
  @ApiResponse({ status: 200, description: 'Return the signature.' })
  @ApiResponse({ status: 404, description: 'Signature not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.signaturesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a signature' })
  @ApiParam({ name: 'id', description: 'Signature ID', type: 'number' })
  @ApiBody({ type: UpdateSignatureDto })
  @ApiResponse({
    status: 200,
    description: 'The signature has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Signature not found.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateSignatureSchema))
    updateSignatureDto: UpdateSignatureDto,
  ) {
    return this.signaturesService.update(id, updateSignatureDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a signature' })
  @ApiParam({ name: 'id', description: 'Signature ID', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'The signature has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Signature not found.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.signaturesService.remove(id);
  }
}
