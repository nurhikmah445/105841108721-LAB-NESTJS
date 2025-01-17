import { ApiProperty } from "@nestjs/swagger";
import { Jenis_Kelamin } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateMahasiswaDTO{
    @ApiProperty({ description: "NIM", type: String, example:"105841110722"})
    @IsString({message: "NIM Harus Bertipe String"})
    @IsNotEmpty({message:"Tidak Boleh Kosong"})
    @Length(1, 12,{message: "Hanya Bisa Sampai 12 Karakter"})
    nim : string


    @ApiProperty({ description: "Nama", type: String, example:"Muh. Tegar Al Fikri"})
    @IsString({message: "Nama Harus Bertipe String"})
    @IsNotEmpty({message:"Tidak Boleh Kosong"})
    @Length(1, 50,{message: "Hanya Bisa Sampai 50 Karakter"})
    nama : string

    @ApiProperty({ description: "Kelas", type: String, example:"5C"})
    @IsString({message: "Kelas Harus Bertipe String"})
    @IsNotEmpty({message:"Tidak Boleh Kosong"})
    @Length(1, 2,{message: "Hanya Bisa Sampai 2 Karakter"})
    Kelas : string

    @ApiProperty({ description: "Jurusan", type: String, example:"Informatika"})
    @IsString({message: "Jurusan Harus Bertipe String"})
    @IsNotEmpty({message:"Tidak Boleh Kosong"})
    @Length(1, 12,{message: "Hanya Bisa Sampai 12 Karakter"})
    jurusan : string

    @ApiProperty({
        enum : Jenis_Kelamin,
        description: "Jenis Kelamin",
        example: "L"
    })
    @IsEnum(Jenis_Kelamin,{message: "Jenis Kelamin Hanya bernilai L atau P"})
    jenis_kelamin : Jenis_Kelamin

}