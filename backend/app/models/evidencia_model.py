from pydantic import BaseModel
from typing import Optional, Literal

class EvidenciaSchema(BaseModel):

    id_reporte:int

    tipo_archivo:Literal[
        "imagen",
        "video",
        "audio",
        "otro"
    ]

    descripcion:Optional[str]=None