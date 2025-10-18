export class ApiResponse {
  static success(res: any, message: string, data?: any, status = 200) {
    return res.status(status).json({
      success: true,
      message,
      data: data || null,
    });
  }

  static error(res: any, message: string, status = 500, errors?: any) {
    return res.status(status).json({
      success: false,
      message,
      errors: errors || null,
    });
  }
}
