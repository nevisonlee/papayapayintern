export class CreateProductDto {
  readonly name!: string;
  readonly quantity!: number;
  readonly description?: string;
  readonly price!: number;
}

