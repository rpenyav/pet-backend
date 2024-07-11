import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder: 'asc' | 'desc' = 'asc',
  ) {
    return this.usersService.findAll(page, pageSize, sortBy, sortOrder);
  }

  @Get('filter')
  @UseGuards(JwtAuthGuard)
  async filter(
    @Query('term') term: string,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder: 'asc' | 'desc' = 'asc',
  ) {
    return this.usersService.filterUsers(
      term,
      page,
      pageSize,
      sortBy,
      sortOrder,
    );
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.usersService.login(email, password);
  }

  @Post('renew')
  async renew(@Body('token') token: string) {
    return this.usersService.renew(token);
  }

  @Post('search')
  @UseGuards(JwtAuthGuard)
  async search(@Body() searchDto: any) {
    return this.usersService.search(searchDto);
  }

  @Put(':id/:arrayName/:itemId')
  @UseGuards(JwtAuthGuard)
  async updateArrayItem(
    @Param('id') userId: string,
    @Param('arrayName') arrayName: string,
    @Param('itemId') itemId: string,
    @Body() updateData: any,
  ) {
    return this.usersService.updateArrayItem(
      userId,
      arrayName,
      itemId,
      updateData,
    );
  }

  // Nuevo endpoint para agregar un nuevo elemento a un array dentro de un usuario
  @Put(':id/:arrayName')
  @UseGuards(JwtAuthGuard)
  async addArrayItem(
    @Param('id') userId: string,
    @Param('arrayName') arrayName: string,
    @Body() newItem: any,
  ) {
    return this.usersService.addArrayItem(userId, arrayName, newItem);
  }

  @Delete(':id/:arrayName/:itemId')
  @UseGuards(JwtAuthGuard)
  async removeArrayItem(
    @Param('id') userId: string,
    @Param('arrayName') arrayName: string,
    @Param('itemId') itemId: string,
  ) {
    return this.usersService.removeArrayItem(userId, arrayName, itemId);
  }
}
